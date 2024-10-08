export const getImageUrl = (image: Buffer) => {
  const base64String = Buffer.from(image)?.toString("base64");
  const url = `data:image/jpeg;base64,${base64String}`;
  return url;
};
