const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((res) => res.json())
    .then((json) => displayLesson(json.data));
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
        <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}</button>
 
        `
        //4. appned kora
        levelContainer.append(btnDiv);

    }
};
loadLessons();