const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
};

const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevelWord(data.data));
};
const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach((word) => {
        console.log(word);
        const card = document.createElement("div");
        card.innerHTML =`
        <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
  <h2 class="font-bold text-2xl">${word.word}</h2>
  <p class="font-semibold">Meaning / Pronunciation</p>
  <div class="text-2xl font-medium font-bangla">"${word.meaning} / ${word.pronunciation}"</div>
  <div class="flex justify-between items-center">
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
    <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></i></button>
  </div>
</div>
        `
        wordContainer.append(card);
    });
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
 
        `
        //4. appned kora
        levelContainer.append(btnDiv);

    }
};
loadLessons();