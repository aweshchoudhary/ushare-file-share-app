const dropBox = document.querySelector(".upload-box");
const iconContainer = document.querySelector("#icons");
const fileInput = document.querySelector("#file");
const progressBox = document.querySelector(".progress-box");
const progressBar = document.querySelector(".progress");
const progressPercent = document.querySelector(".percent");
const linkBox = document.querySelector(".link-box");
const link = document.querySelector("#fileUrl");
const copyBox = document.querySelector(".copy-box");
const UPLOAD_URL = "/api/files";

dropBox.addEventListener("dragover", (e) => {
  e.preventDefault();
  if (!iconContainer.classList.contains("dragged")) {
    iconContainer.classList.add("dragged");
    changeIcon();
  }
});
dropBox.addEventListener("dragleave", (e) => {
  e.preventDefault();
  if (iconContainer.classList.contains("dragged")) {
    iconContainer.classList.remove("dragged");
    changeIcon();
  }
});

dropBox.addEventListener("click", () => fileInput.click());

dropBox.addEventListener("drop", (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length) {
    fileInput.files = files;
    uploadFile();
  }
});

fileInput.addEventListener("change", () => uploadFile());

const uploadFile = async () => {
  progressBox.style.display = "flex";
  if (fileInput.files.length > 1) {
    alert("Please upload one file only");
  } else {
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("myfile", file);
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = async () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        const res = await JSON.parse(xhr.response);
        showLink(res);
        toast("Your file was uploaded.");
      }
    };
    xhr.upload.onprogress = uploadPercent;
    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  }
};

const uploadPercent = (e) => {
  const percent = Math.round((e.loaded / e.total) * 100);
  progressBar.style.width = `${percent}%`;
  progressPercent.innerText = `${percent}%`;
};

const showLink = ({ file }) => {
  progressBox.style.display = "none";
  linkBox.style.display = "block";
  link.value = file;
};
copyBox.addEventListener("click", () => {
  link.select();
  navigator.clipboard.writeText(link.value);
  toast("Link copied");
});

function changeIcon() {
  const filledIcon = `<span class="iconify file-icon" data-icon="ph:files-fill"></span>`;
  const borderedIcon = `<span class="iconify file-icon" data-icon="ph:files-thin"></span>`;

  if (iconContainer.classList.contains("dragged")) {
    iconContainer.innerHTML = "";
    iconContainer.insertAdjacentHTML("beforeend", filledIcon);
  } else {
    iconContainer.innerHTML = "";
    iconContainer.insertAdjacentHTML("beforeend", borderedIcon);
  }
}

changeIcon();
