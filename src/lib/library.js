export default function createTimeItem(content) {
  return {
    content,
  };
}

// Function
// export function isVisible(elem) {
//   if (!(elem instanceof Element))
//     throw Error("DomUtil: elem is not an element.");
//   const style = getComputedStyle(elem);
//   if (style.display === "none") return false;
//   if (style.visibility !== "visible") return false;
//   if (style.opacity < 0.1) return false;
//   if (
//     elem.offsetWidth +
//       elem.offsetHeight +
//       elem.getBoundingClientRect().height +
//       elem.getBoundingClientRect().width ===
//     0
//   ) {
//     return false;
//   }
//   const elemCenter = {
//     x: elem.getBoundingClientRect().left + elem.offsetWidth / 2,
//     y: elem.getBoundingClientRect().top + elem.offsetHeight / 2,
//   };
//   if (elemCenter.x < 0) return false;
//   if (
//     elemCenter.x > (document.documentElement.clientWidth || window.innerWidth)
//   )
//     return false;
//   if (elemCenter.y < 0) return false;
//   if (
//     elemCenter.y > (document.documentElement.clientHeight || window.innerHeight)
//   )
//     return false;
//   let pointContainer = document.elementFromPoint(elemCenter.x, elemCenter.y);
//   do {
//     if (pointContainer === elem) return true;
//   } while ((pointContainer = pointContainer.parentNode));
//   return false;
// }

export const isVisible = function (ele, container) {
  //   const eleTop = ele.offsetTop;
  //   const eleBottom = eleTop + ele.clientHeight;
  const eleLeft = ele.offsetLeft;
  const eleRight = ele.offsetLeft + ele.clientWidth;

  //   const containerTop = container.scrollTop;
  //   const containerBottom = containerTop + container.clientHeight;

  const containerLeft = container.scrollLeft;
  const containerRight = containerLeft + container.clientWidth;

  // The element is fully visible in the container
  return (
    // eleTop >= containerTop &&
    // eleBottom <= containerBottom &&
    eleLeft >= containerLeft && eleRight <= containerRight
  );
};

export function isInViewPort(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function checkScrollBar(element, dir) {
  dir = dir === "vertical" ? "scrollTop" : "scrollLeft";

  var res = !!element[dir];

  if (!res) {
    element[dir] = 1;
    res = !!element[dir];
    element[dir] = 0;
  }
  return res;
}

export const getYear = (dateString) => {
  const date = new Date(dateString);
  return date.getFullYear();
};

export const formatPathName = (pathName) => {
  return pathName.replace("/", "");
};

export const formatTime = (dateTime) => {
  const date = new Date(dateTime.seconds * 1000);
  return `${date.getDate()}/${
    +date.getMonth() + 1
  }/${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`;
};
