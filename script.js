const time = document.querySelector("#time");
const text = document.querySelector("#text")
const mistakes = document.querySelector("#mistakes");

const cpm = document.querySelector("#cpm");
const trybtn = document.querySelector("#trybtn");
const inputBox = document.querySelector("#inputbox");
let mistakeshsb = 0;
let charIndex = 0;
let arr = [
    "After a long day at work, she enjoyed sitting on the porch, sipping her tea, and watching the sunset paint the sky with brilliant hues of orange, pink, and purple, feeling completely relaxed and content.",

    "The children eagerly awaited the school trip, excited to visit the science museum, where they would see dinosaur fossils, interactive exhibits, and a planetarium show, which promised to be both educational and entertaining for everyone.",
    "He had always dreamed of traveling the world, experiencing different cultures, tasting exotic foods, and meeting interesting people, so he finally decided to quit his job and embark on a year-long journey of adventure and discovery.",
    "The team worked tirelessly on the project, often staying late into the night, determined to meet the tight deadline and deliver a product that would not only meet but exceed the client's expectations, showcasing their dedication and skill.",
    "She loved gardening, spending hours tending to her flowers, vegetables, and herbs, finding great joy and satisfaction in nurturing her plants and watching them grow, providing her with a beautiful and bountiful garden year-round.",
    "The novel's intricate plot, well-developed characters, and unexpected twists kept readers on the edge of their seats, unable to put the book down, eagerly turning pages to discover what would happen next in the thrilling story.",
    "He carefully planned the surprise party, coordinating with friends and family, choosing the perfect decorations, menu, and entertainment, ensuring that the celebration would be a memorable and joyous occasion for the guest of honor.",
    "The conference brought together experts from around the world, providing a platform for exchanging ideas, discussing the latest research, and forging new collaborations that could lead to significant advancements in their respective fields.",
    "She spent the afternoon baking cookies, experimenting with different recipes and ingredients, enjoying the process of creating delicious treats, and filling the house with the comforting aroma of freshly baked goods that everyone loved.",
    "The community center offered a variety of activities and classes, from yoga and painting to cooking and dancing, providing a place for people of all ages to learn new skills, stay active, and connect with others.",
    "The children eagerly waited for the ice cream truck, knowing it would bring sweet treats and joyful smiles, as they lined up with their friends, hoping to get their favorite flavors on that hot summer day.",
    "During the summer vacation, the family decided to go on a road trip across the country, visiting national parks, historical landmarks, and famous cities, capturing beautiful memories and photographs along the way.",
    "She spent the entire afternoon baking a delicious chocolate cake, carefully measuring ingredients, mixing the batter, and decorating it with colorful frosting, feeling proud of her creation and excited to share it with her family.",
    "In the bustling city, people hurried to their destinations, navigating through crowded streets and busy markets, each with their own story, creating a tapestry of life filled with energy, ambition, and endless possibilities.",
    "The old library stood at the corner of the street, filled with ancient books and dusty shelves, offering a quiet retreat for those seeking knowledge, adventure, or simply a moment of peace in their hectic lives"
]

let words = '';
let intervalId=null;
trybtn.addEventListener("click", () => {
    if (intervalId) { 
        clearInterval(intervalId);
    }
    let leftTime = 36;
    intervalId = setInterval(() => {
        leftTime--;
        if (leftTime <= -1) {
            clearInterval(intervalId);
            alert('time is up');
        } else {
            time.innerHTML = leftTime;
        }
    }, 1000);

    randomtext();
    text.focus();
    inputBox.removeEventListener('input', initTyping); 
    inputBox.addEventListener('input', initTyping); 
    inputBox.value = '';
    mistakeshsb = 0;
    charIndex = 0;
    mistakes.innerHTML = '';
    cpm.innerHTML = '';
});

function randomtext() {
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let item = random(0, arr.length - 1)
    words = arr[item];

    text.innerHTML = ''
    words.split('').forEach(element => {
        let spanItem = `<span>${element}</span>`
        text.innerHTML += spanItem
    });
    document.addEventListener('keydown', () => inputBox.focus())
    text.addEventListener('click', () => { inputBox.focus() })
}
randomtext()


function initTyping() {
    const character = text.querySelectorAll('span');
    let typecharcater = inputBox.value.split('')[charIndex];
    if (typecharcater == null) {
        character[charIndex].classList.remove('active');
        charIndex--;
        if (mistakeshsb <= 0) {
            mistakeshsb = 0
        }
        else {
            character[charIndex].classList.remove('active');
            mistakeshsb--
        }

        character[charIndex].classList.remove('correct', 'incorrect');

    }
    else {

        if (character[charIndex].textContent === typecharcater) {
            character[charIndex].classList.add('correct')

        }
        else {
            mistakeshsb++
            character[charIndex].classList.add('incorrect')
        }
        character.forEach(element => {
            element.classList.remove('active')
        });
        charIndex++
    }

    mistakes.innerHTML = mistakeshsb
    cpm.innerHTML = charIndex - mistakeshsb
    character[charIndex].classList.add('active');
}
