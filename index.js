const IMGS = [
  {
    alt: "horses",
    src: "https://www.sunhome.ru/i/wallpapers/210/voronie-loshadi.orig.jpg",
  },
  {
    alt: "tigers",
    src: "https://avatanplus.com/files/resources/original/579091ceb27a91560cb98f8b.jpg",
  },
  {
    alt: "rabbits",
    src: "https://w.forfun.com/fetch/f6/f67f4376e3a0369d2db517c168d92a4d.jpeg",
  },
  {
    alt: "cat",
    src: "https://gas-kvas.com/grafic/uploads/posts/2023-10/1696502289_gas-kvas-com-p-kartinki-lyubie-45.jpg",
  },
  {
    alt: "dog&cat",
    src: "https://imgfon.ru/Img/Crop/2880x1620/Animals/drujba-vmeste-kotenok-schenok-ryadom.jpg",
  },
  {
    alt: "lions",
    src: "https://w.forfun.com/fetch/53/534c44100e9c8abb78146fadd5bf7a0b.jpeg",
  },
];

const sliderContainerEl = document.querySelector(".slider-container");
const imgContainerEl = document.querySelector(".image-container");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let curImg = 0;

((imgData = { alt: "", src: "" }, id) => {
  let imgEl = document.createElement("img");
  imgEl.dataset.id = id;
  imgEl.src = imgData.src;
  imgEl.alt = imgData.alt;

  imgContainerEl.appendChild(imgEl);
})(IMGS[curImg], curImg);

const getPrevIndex = (currentImgId) => {
  if (currentImgId - 1 >= 0) {
    return currentImgId - 1;
  } else {
    return IMGS.length - 1;
  }
};

const getNextIndex = (currentImgId) => {
  if (currentImgId + 1 <= IMGS.length - 1) {
    return currentImgId + 1;
  } else {
    return 0;
  }
};

///DOTS

const dotsContainerEl = document.querySelector(".navigation-dots");

//способ на случай если img не много
((countDots) => {
  for (let i = 0; i < countDots; i++) {
    const navDotEl = document.createElement("span");
    navDotEl.classList.add("dot");
    navDotEl.dataset.id = i;

    if (i === 0) {
      navDotEl.classList.add("active");
    }

    dotsContainerEl.appendChild(navDotEl);
  }
})(IMGS.length);

const updateDot = (target) => {
  if (!target.classList.contains("active")) {
    [...dotsContainerEl.children].forEach((dotEl) => {
      if (dotEl.classList.contains("active")) {
        dotEl.classList.remove("active");
      }
    });
    target.classList.add("active");
    return target.dataset.id;
  }
};

sliderContainerEl.addEventListener("click", ({ target }) => {
  const curImgEl = imgContainerEl.querySelector("img");
  curImg = Number(curImgEl.dataset.id);

  if (target.matches(".prev")) {
    curImg = getPrevIndex(curImg);
    const curDotEl = dotsContainerEl.children[curImg];
    updateDot(curDotEl);
  }
  if (target.matches(".next")) {
    curImg = getNextIndex(curImg);
    const curDotEl = dotsContainerEl.children[curImg];
    updateDot(curDotEl);
  }
  if (target.matches(".dot")) {
    curImg = updateDot(target);
  }

  const prevNextImg = IMGS[curImg];

  curImgEl.src = prevNextImg.src;
  curImgEl.alt = prevNextImg.alt;
  curImgEl.dataset.id = curImg;
});
