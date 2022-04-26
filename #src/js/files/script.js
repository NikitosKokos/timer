document.addEventListener('DOMContentLoaded', () => {
   const timer = document.querySelector('.item-timer');
   const timerNumber1 = timer.querySelector('.item-timer__number_1');
   const timerNumber2 = timer.querySelector('.item-timer__number_2');
   const timerNumber3 = timer.querySelector('.item-timer__number_3');
   const buttonCont = document.querySelector('.timer__buttons');
   let timerValue;
   let timerInterval;

   buttonCont.addEventListener('click', (e) => {
      if(e.target.closest('[data-time]')){
         clearInterval(timerInterval);
         const timerArray = e.target.closest('[data-time]').dataset.time.trim().split('');
         const indexOfСolon = timerArray.indexOf(':');
         timerArray.splice(indexOfСolon, 1);
         timerValue = timerArray.map(el => Number(el));
         timerStart();
      }
   });

   function timerStart(){
      function setNewTimerValue(){
         if(timerValue[2] === 0){
            if(timerValue[1] === 0){
               if(timerValue[0] === 0){
                  clearInterval(timerInterval);
                  playAudio();
                  console.log('clear interval');
               }else{
                  timerValue[0]--;
                  timerValue[1] = 5;
                  timerValue[2] = 9;

                  removeSpan(1);
                  removeSpan(2);
                  removeSpan(3);
                  createNumber(timerValue[0], timerNumber1);
                  createNumber(timerValue[1], timerNumber2);
                  createNumber(timerValue[2], timerNumber3);
               }
            }else{
               timerValue[1]--;
               timerValue[2] = 9;

               removeSpan(2);
               removeSpan(3);
               createNumber(timerValue[1], timerNumber2);
               createNumber(timerValue[2], timerNumber3);
            }
         }else{
            timerValue[2]--;

            removeSpan(3);
            createNumber(timerValue[2], timerNumber3);
         }     
      }

      timerNumber1.innerHTML = '';
      timerNumber2.innerHTML = '';
      timerNumber3.innerHTML = '';
      createNumber(timerValue[0], timerNumber1, true);
      createNumber(timerValue[1], timerNumber2, true);
      createNumber(timerValue[2], timerNumber3, true);

      setTimeout(() => {
         setNewTimerValue();
         timerInterval = setInterval(setNewTimerValue, 1000);
      }, 500);
      
   }

   function playAudio(){
      const myAudio = new Audio;
      myAudio.src = "../timer/resources/timerEnd.mp3";
      myAudio.play();

      setTimeout(() => myAudio.pause(), 2000);
   }

   function removeSpan(number){
      switch (number) {
         case 1:
            const span1 = [...timerNumber1.querySelectorAll('span')];
            span1.forEach(span => {
               span.classList.add('hide');
               setTimeout(() => {
                  span.remove();
               }, 500);
            });
            break;
         case 2:
            const span2 = [...timerNumber2.querySelectorAll('span')];
            span2.forEach(span => {
               span.classList.add('hide');
               setTimeout(() => {
                  span.remove();
               }, 500);
            });
            break;
         case 3:
            const span3 = [...timerNumber3.querySelectorAll('span')];
            span3.forEach(span => {
               span.classList.add('hide');
               setTimeout(() => {
                  span.remove();
               }, 500);
            });
            break;
         default:
            break;
      }
   }

   function createNumber(text, place, isStart = false){
      const number = document.createElement('span');
      number.textContent = text;
      if(!isStart){
         number.classList.add('show');
      }else{
         number.classList.add('start');
      }
      
      place.append(number);
   }
}); // end