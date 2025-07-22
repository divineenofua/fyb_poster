export const downloadInstagramPost = async (name: string, imageFile: File) => {
  try {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Could not get canvas context");
    }

    // Canvas size for Instagram
    canvas.width = 1080;
    canvas.height = 1080;

    // Load background image
    const backgroundImage = new Image();
    backgroundImage.crossOrigin = "anonymous";
    backgroundImage.src = "/images/i_attending_intagram_post.svg";
    await new Promise<void>((resolve, reject) => {
      backgroundImage.onload = () => resolve();
      backgroundImage.onerror = () =>
        reject(new Error("Failed to load background image"));
    });

    // Draw background
    ctx.drawImage(backgroundImage, 0, 0, 1080, 1080);

    // Load profile image
    const profileImage = new Image();
    profileImage.crossOrigin = "anonymous";
    const imageUrl = URL.createObjectURL(imageFile);
    profileImage.src = imageUrl;
    await new Promise<void>((resolve, reject) => {
      profileImage.onload = () => resolve();
      profileImage.onerror = () =>
        reject(new Error("Failed to load profile image"));
    });

    // Profile image positioning
    const profileSize = 350;
    const profileX = (1080 - profileSize) / 2;
    const profileY = 210;

    // Circular clip for profile
    ctx.save();
    ctx.beginPath();
    ctx.arc(
      profileX + profileSize / 2,
      profileY + profileSize / 2,
      profileSize / 2,
      0,
      Math.PI * 2
    );
    ctx.clip();

    // === Object-cover logic ===
    const imageAspectRatio = profileImage.width / profileImage.height;
    let sx = 0,
      sy = 0,
      sw = profileImage.width,
      sh = profileImage.height;

    if (imageAspectRatio > 1) {
      // Landscape: crop sides
      sw = profileImage.height;
      sx = (profileImage.width - sw) / 2;
    } else {
      // Portrait: crop top/bottom
      sh = profileImage.width;
      sy = (profileImage.height - sh) / 2;
    }

    ctx.drawImage(
      profileImage,
      sx,
      sy,
      sw,
      sh,
      profileX,
      profileY,
      profileSize,
      profileSize
    );
    ctx.restore();

    // Draw circular border
    ctx.strokeStyle = "#5C2B00";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(
      profileX + profileSize / 2,
      profileY + profileSize / 2,
      profileSize / 2 + 4,
      0,
      Math.PI * 2
    );
    ctx.stroke();

    // Load name background
    const nameBackgroundImage = new Image();
    nameBackgroundImage.crossOrigin = "anonymous";
    nameBackgroundImage.src = "/images/name_bg.png";
    await new Promise<void>((resolve, reject) => {
      nameBackgroundImage.onload = () => resolve();
      nameBackgroundImage.onerror = () =>
        reject(new Error("Failed to load name background"));
    });

    // Draw name background
    const nameBackgroundWidth = 370;
    const nameBackgroundHeight = 77;
    const nameBackgroundX = (1080 - nameBackgroundWidth) / 2;
    const nameBackgroundY = 490;

    ctx.drawImage(
      nameBackgroundImage,
      nameBackgroundX,
      nameBackgroundY,
      nameBackgroundWidth,
      nameBackgroundHeight
    );

    // Draw name text
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // let fontSize = 32;
    // const maxWidth = nameBackgroundWidth - 40;
    // ctx.font = bold ${fontSize}px Arial, sans-serif;

    // while (ctx.measureText(name).width > maxWidth && fontSize > 20) {
    //   fontSize -= 2;
    //   ctx.font = bold ${fontSize}px Arial, sans-serif;
    // }

    ctx.fillText(name, 540, nameBackgroundY + nameBackgroundHeight / 2);

    // Clean up
    URL.revokeObjectURL(imageUrl);

    // Download the image
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
link.download = `${name || "instagram-post"}_1080x1080.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      },
      "image/png",
      1
    );
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
};