const createElements = (arr) => {
  const htmlelements = arr.map((el) => `<span class="btn">${el}</span>`);
  return htmlelements.join(" ");
  
};

const manageSpinner=(status)=>{
  if(status==true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden");
  } else {
document.getElementById("word-container").classList.remove("hidden");
    document.getElementById("spinner").classList.add("hidden");
  }
};

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn");
lessonButtons.forEach((btn) => btn.classList.remove("active"));
};

const loadLevelWord = (id) => {
  manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        removeActive()
        const clickBtn = document.getElementById(`lesson-btn-${id}`);
        clickBtn.classList.add("active")
        displayLevelWord(data.data)});
};
    const loadWordDetail = async (id) => {
        const url = `https://openapi.programming-hero.com/api/word/${id}`;
        const res = await fetch(url);
        const details = await res.json();
        displayWordDetail(details.data);
    };

const displayWordDetail = (word) =>{
    console.log(word);
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML =`
  <div class="">
        <h2 class="text-2xl font-bold">${word.word}(<i class="fa-solid fa-microphone-lines"></i>${word.pronunciation}</h2>
      </div>
      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p>${word.meaning}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>
      <div class="">
        <h2 class="font-bold">Synonym</h2>
        <div class="">${createElements(word.synonyms)}</div>
      </div>
    `
    document.getElementById("my_modal_5").showModal();

};
 
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
     if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class="text-center   col-span-full rounded-x1 py-10 space-y-6 font-bangla">
        <img class="mx-auto src="./assets./alert-error.png"/>
  <p class="text-xl font-medium text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি। </p>
  <h2 class="font-medium text-4-xl">নেক্সট Lesson এ যান</h2>
</div>
        `;
        manageSpinner(false);
        
        return;
    }
       words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML =`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
  <h2 class="font-bold text-2xl">${word.word ? word.word : "শব্দ পাওয়া যায়নি"} </h2>
  <p class="font-semibold">Meaning / Pronunciation</p>
  <div class="text-2xl font-medium font-bangla">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "পাওয়া যায়নি"}"</div>
  <div class="flex justify-between items-center">
    <button onclick="loadWordDetail(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></i></button>
  </div>
</div>
        `
        wordContainer.append(card);
    });
    manageSpinner(false);

    };

const displayLesson = (lessons) => {
    //1. get the container
    const levelContainer = document.getElementById("level-contaner");
    levelContainer.innerHTML = "";
    //2. get into every lesson
    for (let lesson of lessons){

        //3. creat element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML =`
        <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
 
        `
        //4. appned kora
        levelContainer.append(btnDiv);

    }
};
loadLessons();