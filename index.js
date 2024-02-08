// Вашей задачей является создание веб-слайдера для отображения изображений на веб-странице.

// Создайте интерфейс веб-страницы, который включает в себя следующие элементы:
// a. Контейнер для отображения текущего изображения.
// b. Кнопки "Предыдущее изображение" и "Следующее изображение" для переключения между изображениями.
// c. Навигационные точки (индикаторы) для быстрого переключения между изображениями.
// Для создания элементов интерфейса используйте HTML.

// При клике на кнопку "Предыдущее изображение" должно отображаться предыдущее изображение.
// При клике на кнопку "Следующее изображение" должно отображаться следующее изображение.
// При клике на навигационные точки, слайдер должен переключаться к соответствующему изображению.

// Слайдер должен циклически переключаться между изображениями, то есть после последнего изображения должно отображаться первое, и наоборот.

// Добавьте стилизацию для слайдера и элементов интерфейса с использованием CSS для улучшения внешнего вида.

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

const createImgEl = (imgData = { alt: "", src: "" }, id) => {
  let imgEl = document.createElement("img");
  imgEl.dataset.id = id;
  imgEl.src = imgData.src;
  imgEl.alt = imgData.alt;

  imgContainerEl.appendChild(imgEl);
};

createImgEl(IMGS[curImg], curImg);

const prevBtnClick = (currentImgId) => {
  if (currentImgId - 1 >= 0) {
    return currentImgId - 1;
  } else {
    return IMGS.length - 1;
  }
};

const nextBtnClick = (currentImgId) => {
  if (currentImgId + 1 <= IMGS.length - 1) {
    return currentImgId + 1;
  } else {
    return 0;
  }
};

///DOTS

const dotsContainerEl = document.querySelector(".navigation-dots");

//способ на случай если img не много
const createDotEls = (countDots) => {
  for (let i = 0; i < countDots; i++) {
    const navDotEl = document.createElement("span");
    navDotEl.classList.add("dot");
    navDotEl.dataset.id = i;

    if (i === 0) {
      navDotEl.classList.add("active");
    }

    dotsContainerEl.appendChild(navDotEl);
  }
};

createDotEls(IMGS.length);

const dotsClick = (target) => {
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
///очень похожи не придумал, как лучше
const updateDot = (currentImgId) => {
  let curDotEl = dotsContainerEl.children[currentImgId];

  if (!curDotEl.classList.contains("active")) {
    [...dotsContainerEl.children].forEach((dotEl) => {
      if (dotEl.classList.contains("active")) {
        dotEl.classList.remove("active");
      }
    });
    curDotEl.classList.add("active");
  }
};

sliderContainerEl.addEventListener("click", ({ target }) => {
  let curImgEl = imgContainerEl.querySelector("img");
  curImg = Number(curImgEl.dataset.id);

  if (target.matches(".prev")) {
    curImg = prevBtnClick(curImg);
    updateDot(curImg);
  }
  if (target.matches(".next")) {
    curImg = nextBtnClick(curImg);
    updateDot(curImg);
  }
  if (target.matches(".dot")) {
    curImg = dotsClick(target);
  }

  const prevNextImg = IMGS[curImg];

  curImgEl.src = prevNextImg.src;
  curImgEl.alt = prevNextImg.alt;
  curImgEl.dataset.id = curImg;
});
