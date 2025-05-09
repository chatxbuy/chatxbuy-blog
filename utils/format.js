export const formatDate = (unixTime) => {
  const date = new Date(unixTime * 1000).toLocaleString("zh-TW", {
    dateStyle: "short",
  });
  return date;
};

const replaceImage = (imageUrl, size = 500) => {
  // Workaround for image too small
  const zoomCropUrl =
    "https://imageproxy.pimg.tw/zoomcrop?width=90&height=90&url=";

  if (imageUrl?.includes(zoomCropUrl)) {
    imageUrl = imageUrl
      .replace(
        zoomCropUrl,
        "https://imageproxy.pixnet.cc/imgproxy?width=500&height=500&url="
      )
      .split("%26width")[0]; // delete width and height at end of url
    return imageUrl;
  }

  if (imageUrl?.includes("width=90")) {
    imageUrl = imageUrl.replace(/width=90/g, `width=${size}`);
    imageUrl = imageUrl.replace(/height=90/g, `height=${size}`);
    return imageUrl;
  }

  return "error";
};

export const formatArticles = (articles) => {
  if (articles) {
    return articles.map((article) => {
      return {
        id: article?.id,
        title: article?.title,
        cover: replaceImage(article?.thumb ?? article?.cover ?? ""),
        date: formatDate(article?.first_published_at),
      };
    });
  }
  return [];
};

export const getPageItems = (items, perPage, currentPage) => {
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;

  return items?.slice(start, end) ?? [];
};
