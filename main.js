/*
TODO
1) add event listner on keydown, keyup & onclick
2) add/remove when button is clicked/released
3) play sound
*/

var bg_img_url;
const api = () => {
    const endpoint = 'https://api.unsplash.com/photos/random?query=drum'
    fetch(endpoint, {
            headers: {
                'Authorization': 'Client-ID x0K8lxTKeuVKxEPeR6Jxh4o1VFNhX6Zv-7eIX4nRKuI'
            }
        }).then(res => res.json())
        .then(res => {
            bg_img_url = res.urls.small
            change_bg(bg_img_url)
        }).catch(error => console.log(error))
}
api()

const change_bg = (img_src) => {
    let body = document.querySelector('body')

    body.style.background = `linear-gradient(0deg, rgba(20, 33, 61, 0.8), rgba(20, 33, 61, 0.5)), url(${img_src})`
    body.style.backgroundColor = 'background-color: rgba(0,0,0,0.5)'
    body.style.backgroundPosition = 'center'
    body.style.backgroundRepeat = 'no-repeat'
    body.style.backgroundSize = 'cover'
}
const bg_change_btn = document.querySelector('#bg')
bg_change_btn.addEventListener('click', () => {
    api()
})


var audio_vol = 0.6;
// play audio on keydown
const playSound = (e) => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    // console.log(audio); //if data-key is not in audio then in console we will get null
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); //we'are animations so for that we selected keys
    if (!audio) // handle null keys
        return;
    audio.currentTime = 0; // allow fast play
    audio.volume = audio_vol;
    audio.play();
    key.classList.add('playing'); //added class playing using js
    setTimeout(() => {
        key.classList.remove('playing');
    }, 200)
}

//play & stop audio on click
const handleKeyOnClick = (e) => {
    const keycode = e.target.getAttribute("data-key");
    const audio = document.querySelector(`audio[data-key="${keycode}"]`);
    audio.volume = audio_vol;
    if (!audio) // handle null keys
        return;
    audio.currentTime = 0; // allow fast play
    audio.play();
    e.target.classList.add('playing')
    setTimeout(() => {
        e.target.classList.remove('playing')
    }, 200)
}

//volume control
const vol_slider = document.querySelector('#vol-slider');
vol_slider.oninput = (e) => {
    audio_vol = e.target.value / 100;
}

var random_music_id;
var random_music_on = false;
const random_music = () => {
    const data_keys = [65, 83, 68, 70, 71, 72, 74, 75, 76];

    random_music_id = setInterval(() => {
        const random_key = data_keys[Math.floor(Math.random() * data_keys.length)]

        const audio = document.querySelector(`audio[data-key="${random_key}"]`);
        const key = document.querySelector(`.key[data-key="${random_key}"]`);

        audio.volume = audio_vol;
        audio.play();
        key.classList.add('playing'); //added class playing using js
        setTimeout(() => {
            key.classList.remove('playing');
        }, 300)
    }, 250)
}
const random_music_btn = document.querySelector('#random');
random_music_btn.addEventListener('click', () => {
    if (random_music_on) {
        clearInterval(random_music_id)
        random_music_on = false
        random_music_btn.innerHTML = 'Start Auto Music';
    } else {
        random_music();
        random_music_on = true
        random_music_btn.innerHTML = 'Stop Auto Music';
    }
})

// theme changing
// theme1

// theme2


var keys = document.querySelectorAll('.key');
// console.log(keys)
for (let i = 0; i < keys.length; i++) {
    // console.log(keys[i])
    keys[i].addEventListener('click', handleKeyOnClick)
}

// event lisners for keyup & down
window.addEventListener('keydown', playSound) //event listner for keydown event and call function playSound which plays the sound