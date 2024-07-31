export async function getPhotos(user) {
  // get donations list for  the user
  try {
    const res = await fetch("url based on type");
    const fdata = await res.json();
    if (fdata.success) {
      return fdata.feedbacks;
    } else {
      throw new Error(fdata.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
export async function addPhoto(image) {
  // get donations list for  the user
  try {
    const res = await fetch("url based on type", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(image),
    });
    const fdata = await res.json();
    if (fdata.success) {
      return fdata.feedback;
    } else {
      throw new Error(fdata.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}
