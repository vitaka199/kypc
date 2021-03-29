let money = document.getElementById("money");
      let display = document.getElementById("display");
      let bill_acc = document.getElementById("bill_acc");
      let displayInfo = document.getElementById("displayInfo");
      let displayBalance = document.getElementById("displayBalance");
      let progressBar = document.getElementsByClassName("progress-bar")[0];
      let change_box = document.getElementById("change_box");
      let lock = document.getElementById("lock");
      let progress = 0;
      
      function getCoffee(coffeName,price){
        if(+money.value>=price){
          money.value = +money.value-price;
          displayBalance.innerText = money.value;
          let timerId = setInterval(()=>{
            lock.hidden = false;
            if(progress>110){
              clearInterval(timerId);
              progressBar.hidden = true;
              progressBar.style.width = 0+'%';
              
              displayInfo.innerHTML = `<i class="fas fa-coffee fa-5x"></i> Кофе ${coffeName} готов`;
              progress = 0;
              lock.hidden = true;
              return;
            }
            else if(progress<40) displayInfo.innerHTML = `<i class="fas fa-hourglass-start"></i> Приготовление...`;
            else if(progress<80) displayInfo.innerHTML = `<i class="fas fa-hourglass-half"></i> Приготовление...`;
            else displayInfo.innerHTML = `<i class="fas fa-hourglass-end"></i> Приготовление...`;
            progressBar.hidden = false;
            progressBar.style.width = ++progress+'%';
          },70);
        }else{
          displayInfo.innerHTML = `<i class="far fa-frown"></i> Недостаточно средств`;
        }
      }
      
      
      let banknotes = document.querySelectorAll("[src$='rub.jpg']");
      let zIndex = 1;
      for(let i=0; i<banknotes.length; i++){ 
        const banknote = banknotes[i]; 
        banknote.onmousedown = function(e){
          this.ondragstart = function(){return false;}
          this.style.position = 'absolute';
          this.style.zIndex = ++zIndex;
          this.style.transform = 'rotate(90deg)';
          moveAt(e);
          function moveAt(event){
            banknote.style.top = (event.clientY-banknote.offsetHeight/2)+'px';
            banknote.style.left = (event.clientX-banknote.offsetWidth/2)+'px';
          }
          document.addEventListener('mousemove',moveAt);
          this.onmouseup = function(){
            document.removeEventListener('mousemove',moveAt);
            const bill_acc_top = bill_acc.getBoundingClientRect().top; 
            const bill_acc_bottom = bill_acc.getBoundingClientRect().bottom - (bill_acc.getBoundingClientRect().height*2/3);
            const bill_acc_left = bill_acc.getBoundingClientRect().left;
            const bill_acc_right = bill_acc.getBoundingClientRect().right;
            const banknote_top = this.getBoundingClientRect().top; 
            const banknote_left = this.getBoundingClientRect().left;
            const banknote_right = this.getBoundingClientRect().right;
            if(bill_acc_top<banknote_top && bill_acc_bottom>banknote_top && bill_acc_left<banknote_left && bill_acc_right>banknote_right){
              money.value = (+money.value)+(+this.dataset.value);
              displayBalance.innerText = money.value;
              this.hidden = true;
            }
          }
        }
      }
      
      function getChange(num){
        const change_box_h = change_box.getBoundingClientRect().height-60;
        const change_box_w = change_box.getBoundingClientRect().width-60;
        let change = 0;
        const top = Math.random()*change_box_h;
        const left = Math.random()*change_box_w;
        
        if(num>=10) change = 10;
        else if(num>=5) change = 5;
        else if(num>=2) change = 2;
        else if(num>=1) change = 1;
        else{
        
        //function getChange(num){
			//if(num>=10){
				//console.log(10);
				//getChange(num-10);
			//}else if(num>=5){
				//console.log(5);
				//getChange(num-5);
			//}else if(num>=2){
				//console.log(2);
				//getChange(num-2);
			//}else if(num>=1){
				//console.log(1);
				//getChange(num-1);
				//}
			//}
			
			  //  while(num>0){
				//	if(num>=10){
				//		console.log(10);
					//	num = num-10
				//	}else if(num>=5){
					//	console.log(5);
					//	num = num-5
				    //  }else if(num>=2){
					//	console.log(2);
					//	num = num-2
				//	}else if(num>=1){
					//	console.log(1);
					//	num = num-1	
					
          const audio = new Audio("audio/getChange.mp3");
          audio.play();
        }
        
          //if(change>0){
          //change_box.innerHTML += `<img src="/img/${change}rub.png" style="top:${top}px;left:${left}px;">`;
          //console.log(change);
          //getChange(num-change);
          
          if(change>0){
          const img = document.createElement('img');
          img.src = `image/moneto/${change}rub.png`;
          img.style.top = top+'px';
          img.style.left = left+'px';
          img.onclick = function(){this.hidden=true;}
          change_box.append(img);
          displayBalance.innerText = money.value=0;
          getChange(num-change);
        }
      }
        
      
      