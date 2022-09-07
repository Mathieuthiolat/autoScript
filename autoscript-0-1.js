
/**
 *  Author : Alxb & FreeQyMat
 *  Version: 0.1 (06/09/2022)
 */

let script = {
  startBtn : true,
  delay: {
    defaultLoopTime: 4 * 60000,
    afterAction: 1.5 * 1000,
    afterPageChange: 7 * 1000,
    afterPageChangeError: 7 * 1000,
    afterCandyClaim: 3 * 1000,
  },
  paths: {
    login : "#root button.relative.px-8.py-3:nth-child(2)",
    loginWax : "#root>div>div>div:nth-child(3)>div",
    verifyBtn : "#root button:nth-child(2)",
    //Change url -> document.location.href = "/mining";
    changeSphere : "#root .flex.flex-col.items-center.justify-center.flex-1.py-10>div>div:nth-child(2)", // 1 oil , 2Iron, 3Gold
    sphereNext : "#root .flex.flex-col.items-center.justify-center.flex-1.py-10 .flex.items-center.gap-x-5:nth-child(4)  button:nth-child(2)",
    availableMining: "#root .relative.fade-animation .flex.flex-col.max-h-screen.min-h-screen.overflow-hidden>main>section div.flex.flex-col.flex-1  button:nth-child(1)",
    activeMining: "#root .relative.fade-animation .flex.flex-col.max-h-screen.min-h-screen.overflow-hidden>main>section div.flex.flex-col.flex-1  button:nth-child(2)",
    claimTool : "#root .relative.fade-animation .flex.flex-col.max-h-screen.min-h-screen.overflow-hidden>main>section div.flex-1.p-5.overflow-y-scroll.border.shadow-inner .flex.flex-col button",
    selectToolsClaim : "#root .relative.px-8.py-3.group.text-stroke",
    selectTool : "#root .flex.flex-col.w-full.gap-y-2 button.cursor-pointer.relative.flex.flex-col.overflow-hidden.duration-300.transition-all.card.group",
    startMining : ".flex.items-end.justify-center button"
  },
  xpaths: {
    launch: "/html/body/div[1]/div/div[2]/section/div/div[3]/div/button[1]",
  },
  getCurrentPageName: () => {
    return window.location.pathname.substr(1) || '';
  },
  switchingPageForRefresh: async () => {
    autoFarmEngine.getElement(script.paths.availableMining).click();
    await autoFarmEngine.sleep(script.delay.afterAction);
    autoFarmEngine.getElement(script.paths.activeMining).click();
    await autoFarmEngine.sleep(script.delay.afterAction);
  },
  mainLoop: async () => {
    const result = {
      relaunch: false,
      remainingTime: script.delay.defaultLoopTime
    };

    try {
      console.log('--dbg-- Starting Main Loop !');
      // Check if unexpected error popup
      if (autoFarmEngine.getElement(script.paths.unexpectedError)) {
        console.log('--dbg-- UNEXPECTED ERROR FOUND... trying to resolve...');
        autoFarmEngine.getElement(script.paths.unexpectedError).click();
        await autoFarmEngine.sleep(script.delay.afterAction);
        await script.switchingPageForRefresh();
      }


      //Check if we need to verify
      if(document.querySelector(".Toastify>div") != null || document.querySelector(".Toastify>div") != undefined)
        document.location.href = "/mining"

      //Check if we are in mining part
      if(!document.location.href.includes("/mining"))
        document.location.href = "/mining"

      //Check if we are on the verify page
      if(autoFarmEngine.getElementByText("button","Login") != undefined){
        console.log('--dbg-- Login page');
        autoFarmEngine.getElementByText("button","Login").click();
        await autoFarmEngine.sleep(script.delay.afterAction);
        autoFarmEngine.getElement(script.paths.loginWax).click();
        await autoFarmEngine.sleep(script.delay.afterAction);
      }

      //Check if we are on the verify page
      if(autoFarmEngine.getElementByText("button","Verify") != undefined){
        console.log('--dbg-- verifi page');
        autoFarmEngine.getElementByText("button","Verify").click();
        await autoFarmEngine.sleep(script.delay.verifyBtn);     
      }

      //Enter mining page 
      if(autoFarmEngine.getElementByText("p","Choose a sphere")){
        /*console.log('--dbg-- Selection sphere ');
        autoFarmEngine.getElementByText("button","Available items").click();
        await autoFarmEngine.sleep(script.delay.afterAction);*/

        console.log('--dbg-- enter sphere page');
        autoFarmEngine.getElementByText("button","Next").click();
        await autoFarmEngine.sleep(script.delay.afterAction);
      }       

      // Check if tools to claim ,
      if(autoFarmEngine.getElement(script.paths.activeMining)){
        console.log('--dbg-- View active Minigns ...');
        autoFarmEngine.getElement(script.paths.activeMining).click();
        await autoFarmEngine.sleep(script.delay.afterAction);
  
        if (!autoFarmEngine.getElement(script.paths.claimTool)) {
          console.log('--dbg-- No tools need to claim');
        } else { 
          console.log('--dbg-- Loop trough all tools ...');
          var nbTools = autoFarmEngine.getElementAll(script.paths.selectToolsClaim).length;
          await autoFarmEngine.sleep(script.delay.afterAction);
    
          console.log(nbTools +" Nombre d'outils en attente")
          for(var i=0;i<nbTools;i++){
            //Check if we need to verify
            if(document.querySelector(".Toastify>div") != null || document.querySelector(".Toastify>div") != undefined)
              document.location.href = "/mining"
              
            console.log('--dbg-- trying to claim...');
            autoFarmEngine.getElement(script.paths.selectToolsClaim).click();
            await autoFarmEngine.sleep(script.delay.afterAction);
    
          
          }  
        }
      }


      //Check if tool need to mine
      console.log('--dbg-- Re-launch ...');
      autoFarmEngine.getElement(script.paths.availableMining).click();
      await autoFarmEngine.sleep(script.delay.afterAction);

      if (!autoFarmEngine.getElement(script.paths.selectTool)) {
        console.log('--dbg-- No tools need to run');
      } else {
        console.log('--dbg-- Loop trough all tools ...');
        var nbTools = autoFarmEngine.getElementAll(script.paths.selectTool).length;
        await autoFarmEngine.sleep(script.delay.afterAction);
  
        console.log(nbTools +" Nombre d'outils en attente")
        for(var i=0;i<nbTools;i++){
          console.log('--dbg-- Check if tools is valid ...');
          autoFarmEngine.getElement(script.paths.selectTool).click();
          await autoFarmEngine.sleep(script.delay.afterAction);

          if(!autoFarmEngine.getElement(script.paths.startMining).disabled){
            console.log('--dbg-- validate tool ...');
            autoFarmEngine.getElement(script.paths.startMining).click();
            await autoFarmEngine.sleep(script.delay.afterAction);  
            autoFarmEngine.getElement(script.paths.availableMining).click();
            await autoFarmEngine.sleep(script.delay.afterAction);
          }
        }
      }

      console.log('--dbg-- EOF Main Loop !');
    } catch (err) {
      console.log('### UNEXPECTED ERROR: ', err);
    }
    return result;
  },
};

const autoFarmEngine = {
  _version: '0.1',
  _loopStart: false,
  defaultLoopTime: 10 * 1000,
  _loopSleep: async (timeMs = autoFarmEngine.defaultLoopTime) => {
    autoFarmEngine.monitor._loopTimer = timeMs;
    await new Promise((res) => setTimeout(res, timeMs));
  },
  getElement: (path) => {
    return document.querySelector(path);
  },
  getElementAll: (path) => {
    return document.querySelectorAll(path);
  },
  getElementByText: (object,text) => {
    return Array.from(document.querySelectorAll(object)).find(el => el.textContent === text);
  },
  getElementByXpath: (path) => {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
  },
  calculateRemainingTime: (timeSring) => {
    const timeSplit = timeSring.split(':');
    return (parseInt(timeSplit[0], 10) * 60 * 60) + (parseInt(timeSplit[1], 10) * 60) + parseInt(timeSplit[2], 10);
  },
  sleep: async (timeMs = 2000) => {
    await new Promise((res) => setTimeout(res, timeMs));
  },
  start: async (scenario = script) => {
    if (!autoFarmEngine.monitor._isInitialized) {
      autoFarmEngine.monitor.initialize();
    }

    if (!autoFarmEngine._loopStart) {
      console.log('### Starting Main loop !!');
      autoFarmEngine._loopStart = true;

      while (autoFarmEngine._loopStart) {
        autoFarmEngine.monitor.setRunning();
        let loopResult = await scenario.mainLoop();
        autoFarmEngine.monitor.setWaiting();
        console.log('# LoopResult', loopResult);

        if (autoFarmEngine._loopStart) {
          if (loopResult.relaunch) continue;
          await autoFarmEngine._loopSleep(loopResult.remainingTime);
        }
      }
      console.log('### Main loop stoped !!');
      autoFarmEngine.monitor.setLoaded();
    } else {
      console.log('### Main loop already started !!');
    }
  },
  stop: () => {
    if (autoFarmEngine._loopStart) {
      console.log('### Waiting for stoping Main loop !!');
      autoFarmEngine._loopStart = false;
    } else {
      console.log('### Main Loop already stoped !!');
    }
    autoFarmEngine.monitor.setLoaded();
  },
  /**
   *  TODO: Ajouter un btn Start/Stop/Pause
   */
  monitor: {
    _isInitialized: false,
    _state: 'loaded',
    _loopTimer: 0,
    css: `
      #autoFarmMonitor {
        position: absolute;
        bottom: 0px;
        left: 50%;
        width: 300px;
        height: 50px;
        z-index: 100;
        border-top: 3px solid white;
        border-right: 3px solid white;
        border-left: 3px solid white;
        border-radius: 10px 10px 0 0;
        text-align: center;
        padding-top: 5px;
        font-size: 24px;

        box-shadow: 9px -9px 40px 4px rgba(0,0,0,0.67);
        -webkit-box-shadow: 9px -9px 40px 4px rgba(0,0,0,0.67);
        -moz-box-shadow: 9px -9px 40px 4px rgba(0,0,0,0.67);
      }
      #startBtn{
        position: absolute;
        bottom: 60px;
        width: 300px;
        height: 50px;
        z-index: 100;
        border: 3px solid white;
        border-radius: 10px 10px 10px 10px;
        text-align: center;
        padding-top: 5px;
        font-size: 24px;
        box-shadow: 9px -9px 40px 4px rgba(0,0,0,0.67);
        -webkit-box-shadow: 9px -9px 40px 4px rgba(0,0,0,0.67);
        -moz-box-shadow: 9px -9px 40px 4px rgba(0,0,0,0.67);
        background: #fff;
        left: 50%;
      }
      .monitor-loaded {
        background-color: #85C1E9;
      }
      .monitor-running ,.button-off{
        background-color: #F1948A!important;
      }
      .monitor-waiting,.button-on {
        background-color: #82E0AA!important;
      }
    `,
    initialize: () => {
      if (!autoFarmEngine.monitor._isInitialized) {
        const addCSS = document.createElement('style');
        addCSS.innerHTML = autoFarmEngine.monitor.css;
        document.head.appendChild(addCSS);

        /* CountDown */
        const monitor = document.createElement('div');
        monitor.setAttribute('id', 'autoFarmMonitor');

        const monitorUl = document.createElement('ul');
        const monitorAction = document.createElement('li');
        const monitorInfo = document.createElement('li');

        monitor.classList.add('monitor-loaded');
        monitor.innerHTML = 'Not Started';
        document.body.appendChild(monitor);
        /* Start/Stop */

        const startButtonContaint = document.createElement('div');
      
        startButtonContaint.setAttribute('id', 'startBtn');

        startButtonContaint.classList.add('button-style');
        startButtonContaint.classList.add('button-on');

        startButtonContaint.innerHTML = 'Start';

        document.body.appendChild(startButtonContaint);

        startButtonContaint.addEventListener('click', event => {
          if(script.startBtn){
            autoFarmEngine.stop()
          }else{
            autoFarmEngine.start()
          }
          
          script.startBtn = autoFarmEngine.monitor.checkBtnON(startButtonContaint,script.startBtn,"StartBtn")

        });
  
  
        setInterval(() => {
          if (autoFarmEngine.monitor._loopTimer > 0) {
            autoFarmEngine.monitor._loopTimer = (autoFarmEngine.monitor._loopTimer < 1000) ? 0 : (autoFarmEngine.monitor._loopTimer - 1000);
            if (autoFarmEngine.monitor._state === 'waiting') {
              const monitor = document.getElementById('autoFarmMonitor');
              const hour = Math.floor(autoFarmEngine.monitor._loopTimer / (60 * 60 * 1000));
              const min = Math.floor((autoFarmEngine.monitor._loopTimer % (60 * 60 * 1000)) / (60 * 1000));
              const sec = Math.floor(autoFarmEngine.monitor._loopTimer / 1000) - ((hour * 60 * 60) + (min * 60));
              monitor.innerHTML = `Wait: ${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
            }
          }
        }, 1000);

        autoFarmEngine.monitor._isInitialized = true;
      }
    },
    checkBtnON: (obj,varBool,objName,justCheck = false)=>{
      if(varBool == true && !justCheck || varBool == false && justCheck ){
        varBool =  false;
        obj.innerHTML = objName+' OFF';
        obj.classList.add('button-off');
        obj.classList.remove('button-on');
      }
      else{
        varBool = true
        obj.innerHTML = objName+' ON';
        obj.classList.remove('button-off');
        obj.classList.add('button-on');
      }
      console.log(objName+" check ->"+varBool)
      return varBool;
    },
    setLoaded: (msg = 'Stopped') => {
      autoFarmEngine.monitor._state = 'loaded';
      const monitor = document.getElementById('autoFarmMonitor');
      monitor.classList.remove('monitor-running');
      monitor.classList.remove('monitor-waiting');
      monitor.classList.add('monitor-loaded');
      monitor.innerHTML = msg;
    },
    setRunning: (msg = 'Check in progress') => {
      autoFarmEngine.monitor._state = 'running';
      const monitor = document.getElementById('autoFarmMonitor');
      monitor.classList.remove('monitor-loaded');
      monitor.classList.remove('monitor-waiting');
      monitor.classList.add('monitor-running');
      monitor.innerHTML = msg;
    },
    setWaiting: (msg = 'Wait...') => {
      autoFarmEngine.monitor._state = 'waiting';
      const monitor = document.getElementById('autoFarmMonitor');
      monitor.classList.remove('monitor-running');
      monitor.classList.remove('monitor-loaded');
      monitor.classList.add('monitor-waiting');
      monitor.innerHTML = msg;
    }
  }, // eo monitor
};

autoFarmEngine.start();