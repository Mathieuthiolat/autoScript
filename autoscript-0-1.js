
/**
 *  Author : Alxb & FreeQyMat
 *  Version: 0.1 (09/08/2022)
 */
let script = {
  delay: {
    defaultLoopTime: 20 * 1000,
    afterAction: 1.5 * 1000,
    afterPageChange: 7 * 1000,
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
    selectTool : "#root .flex.flex-col.w-full.gap-y-2 button",
    startMining : "#headlessui-portal-root .grid.grid-cols-2.shadow-inner button",
    /*claim: "#app > div > div.base-layout__main.base-layout__main--with-reward > div.reward-claimable > div.claim-reward > button > span",
    timer: "#app > div > div.base-layout__main > section > section > div > div.in-dungeon__timer-section > div.inline-timer.in-dungeon__timer-section-timer",
    claimRewards: "#app > div.base-layout.base-layout--green-bg > div.header > div.header__cell.header__cell--column-small-screen > div > div > button > div > div",
    grabRewards: "#app > div.base-layout.base-layout--green-bg > div.header > div.header__cell.header__cell--column-small-screen > div > div > div.popup.reward-treasure-popup > div > button",
    errorRewards: "#app > div.popup.error-view > div > div > button",
    candyClaim: "#app > div.base-layout.base-layout--green-bg > div.base-layout__main > div.popup > div > div > button.btn.confirm-send-script-with-claimable-candy-modal__btn.confirm-send-wombat-with-claimable-candy-modal__btn--accept.btn--primary.btn--primary-without-arrow.btn--with-icon",
    candyCancel: "#app > div.base-layout.base-layout--green-bg > div.base-layout__main > div.popup > div > div > button.btn.btn--outlined.confirm-send-wombat-with-claimable-candy-modal__btn.confirm-send-wombat-with-claimable-candy-modal__btn--reject",
    unexpectedError: "#app > div.popup.error-view > div > div > button",
    claimLevelUp: "#app > div.base-layout > div.base-layout__main.base-layout__main--with-reward > div.reward-claimable > div.claim-level.claim-level--active > button",
    pages: {
      //clan: "#app > div.base-layout.base-layout--black-bg > div.base-layout__main > div > div > div:nth-child(1) > a",
    },*/
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
      // Check if remaining time ? (yes, wait next loop),
      if (!autoFarmEngine.getElement(script.paths.claimTool)) {
        console.log('--dbg-- TIMER PATH FOUND...');
      } else {
        if(1=1){

        //}else{
          console.log('--dbg-- CLAIM PATH FOUND... trying to claim...');
          autoFarmEngine.getElement(script.paths.claimTool).click();
          await autoFarmEngine.sleep(script.delay.afterAction);

          console.log('--dbg-- Re-launch ...');
          autoFarmEngine.getElement(script.paths.availableMining).click();
          await autoFarmEngine.sleep(script.delay.afterAction);

          console.log('--dbg-- Select first tool ...');
          autoFarmEngine.getElement(script.paths.selectTool).click();
          await autoFarmEngine.sleep(script.delay.afterAction);

          console.log('--dbg-- validate tool ...');
          autoFarmEngine.getElement(script.paths.startMining).click();
          await autoFarmEngine.sleep(script.delay.afterAction);

          console.log('--dbg-- View active Minigns ...');
          autoFarmEngine.getElement(script.paths.activeMining).click();
          await autoFarmEngine.sleep(script.delay.afterAction);
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