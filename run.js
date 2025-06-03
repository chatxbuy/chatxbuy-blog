import data from './data.json' with { type: 'json' };
import dataBody from './dataBody2.json' with { type: 'json' };
import dataProcessed from './dataProcessed.json' with { type: 'json' };
import * as cheerio from 'cheerio';
import axios from 'axios';
import fs from 'fs';
import path from 'path';

export const formatDate = (unixTime) => {
  const date = new Date(unixTime * 1000);
  return date;
};

const replaceImage = (imageUrl, size = 500) => {
  // Workaround for image too small
  const zoomCropUrl =
    'https://imageproxy.pimg.tw/zoomcrop?width=90&height=90&url=';

  if (imageUrl?.includes(zoomCropUrl)) {
    imageUrl = imageUrl
      .replace(
        zoomCropUrl,
        'https://imageproxy.pixnet.cc/imgproxy?width=500&height=500&url='
      )
      .split('%26width')[0]; // delete width and height at end of url
    return imageUrl;
  }

  if (imageUrl?.includes('width=90')) {
    imageUrl = imageUrl.replace(/width=90/g, `width=${size}`);
    imageUrl = imageUrl.replace(/height=90/g, `height=${size}`);
    return imageUrl;
  }

  return 'error';
};

export const formatArticles = (articles) => {
  if (articles) {
    return articles.map((article) => {
      return {
        id: article?.id,
        title: article?.title,
        cover: replaceImage(article?.thumb ?? article?.cover ?? ''),
        date: formatDate(article?.first_published_at),
        tags: article?.tags_string.split(','),
      };
    });
  }
  return [];
};

const allIds = [
  '37759546',  '173749882', '167552425',
  '166206388', '164045008', '152852254',
  '86106958',  '81263644',  '77465626',
  '74174866',  '72199219',  '69436093',
  '68118106',  '66253645',  '65674783',
  '64423372',  '63090145',  '61479400',
  '61479190',  '61478974',  '61478623',
  '61478356',  '61477984',  '61250446',
  '61249603',  '61248004',  '61247377',
  '61246594',  '42219838',  '41667376',
  '40926559',  '40077706',  '39320224',
  '38104021',  '37762087',  '37761925',
  '37761019',  '37760893',  '37760101',
  '2010946',   '320971'
]

const catchFileName = (url) => {
  let filename = '';
  if (url.includes('chatxbuy%2F')) {
    filename = url.split('chatxbuy%2F').pop();
  } else if (url.includes('%2')) {
    filename = url.split('%2').pop();
  } else {
    filename = url.split('/').pop();
  }
  filename = filename.split('?')[0];
  return filename;
}

const downloadImage = async (url) => {
  const filename = catchFileName(url);

  const response = await axios({
    url,
    method: 'GET',
    responseType: 'stream',
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://cdn-images-1.medium.com', // 換成圖片所在網站
    },
  });

  const writer = fs.createWriteStream(path.resolve(`./public/img/pixnet/${filename}`));

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
};


// const processedData = formatArticles(data.articles).map((item) => {
//   return {
//     articleId: item.id,
//     title: item.title,
//     cover: catchFileName(item.cover),
//     date: item.date,
//     tags: item.tags,
//     pinned: false,
//     body: dataBody.find((blog) => blog.id === item.id).body,
//   };
// });

// fs.writeFileSync('./dataProcessed.json', JSON.stringify(processedData, null, 2));




// Replace image src
// dataBody.forEach((item) => {
//   const $ = cheerio.load(item.body);
//   const prefix = '/img/';

//   $('img').each((i, img) => {
//     const oldSrc = $(img).attr('src');
//     const filename = catchFileName(oldSrc);
//     const newSrc = prefix + filename; 
//     $(img).attr('src', newSrc); 
//   });

//   const modifiedHtmlString = $('body').html();
//   item.body = modifiedHtmlString;
// });

// fs.writeFileSync('./dataBody2.json', JSON.stringify(dataBody, null, 2));



// Download images
// let imageSources = [];

// dataBody.forEach((item) => {
//   const $ = cheerio.load(item.body);
//   imageSources.push(...$('img').map((i, img) => $(img).attr('src')).get());
// });


// imageSources.forEach(async (item) => {
//   try {
//     await downloadImage(item);
//   } catch (error) {
//     console.log(item);
//   }
// });


// dataProcessed.forEach((item) => {
//   const $ = cheerio.load(item.body);
//   $('img').each((i, img) => {
//     const src = $(img).attr('src');
//     console.log(src);
//   });
// });

// dataProcessed.forEach((item) => {
//   const mdContent = `
//   ---
//   articleId: ${item.articleId}
//   title: ${item.title}
//   cover: ${item.cover}
//   date: ${item.date}
//   tags:
//    ${item.tags.map((tag) => `- ${tag}`).join('\n')}
//   pinned: false
//   ---
//   ${item.body}
//   `

//   fs.writeFileSync(`./content/blog/${item.articleId}-${item.title}.md`, mdContent);
// });

dataProcessed.forEach((item) => {
  const encodedTitle = encodeURIComponent(item.title.replace(/ /g, '-'));

  const $ = cheerio.load(item.body);
  const actualCover = $('img').attr('src');
  
  const mdContent = `---
articleId: ${item.articleId}
path: /blog/${item.articleId}-${encodedTitle}
title: ${item.title}
cover: ${actualCover}
date: ${item.date}
tags:
  ${item.tags.map((tag) => `- ${tag}`).join('\n  ')}
pinned: false
---
  ${item.body}
  `

  fs.writeFileSync(`./content/blog/${item.articleId}-${item.title.replace(/ /g, '-')}.md`, mdContent);
})
