# React Form

A frontend project built with **React, TypeScript, and Tailwind CSS**, showcasing my ability to create readable and scalable user-facing applications using common form inputs.

## Features

- **Text input** with validation and intuitive UI  
- **Range slider** with an additional tooltip  
- **File upload** with drag-and-drop support  
- **Calendar** with disabled holidays  

## Biggest challenges

- Styling **react-calendar** — I intentionally avoided importing the default CSS and implemented custom styles instead, which gave me full control over the UI.
- Consuming a **holiday API** to disable specific (“red”) calendar days.

## Code snippet worth mentioning

I needed to format a `Date` object (from the `react-calendar` component) into a string so it could be compared with date strings returned by the API.  The `padStart()` string method helped ensure a consistent format and avoid cases like `2025-3-7` instead of `2025-03-07`.


```ts
const dateFormatterYEAR_MONTH_DAY = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

```


## Demo

[LiveDemo](https://think-form.vercel.app/)

![LangingPageDemo](/Screenshot-1.png)
