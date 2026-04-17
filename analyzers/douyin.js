const PLATFORM_NAME = "douyin";
const BUTTON_ATTRIBUTE = "data-grabclip-button";

// Button configuration constants
const PARAMS = {
  NORMAL: {
    size: "48px",
    svgSize: "32px",
    margin: {
      top: "2px",
      right: "2px",
      bottom: "2px",
      left: "2px",
    },
  },
  MINI: {
    size: "32px",
    svgSize: "16px",
    margin: {
      top: "0px",
      right: "0px",
      bottom: "0px",
      left: "0px",
    },
  },
};

// DOM selectors
const SELECTORS = {
  USER_ICON: 'div[data-click-from="click_icon"]',
  SLIDER_VIDEO: "div#sliderVideo, div#slideMode",
  ACTIVE_VIDEO: 'div[data-e2e="feed-active-video"]',
};

class DouyinAnalyzer extends window.BaseAnalyzer {
  constructor() {
    super(PLATFORM_NAME);
    this.observer = null;
  }

  isVideoPage(url) {
    try {
      const supportedDomains = PLATFORM_INFO.domains;
      const parsedUrl = new URL(url);
      const hostname = parsedUrl.hostname;
      const modal_id = parsedUrl.searchParams.get("modal_id");

      const isSupported = supportedDomains.some(
        (domain) => hostname === domain || hostname.endsWith(`.${domain}`),
      );
      if (!isSupported) {
        return false;
      }

      return modal_id !== null;
    } catch (error) {
      console.error("Error checking Douyin video page:", error);
      return false;
    }
  }

  extractVideoPageInfo(button = null) {
    try {
      let curPageUrl = window.location.href;

      if (!this.isVideoPage(curPageUrl)) {
        let videoId = null;
        if (button) {
          // Extract video ID
          const videoElement = button.closest(SELECTORS.SLIDER_VIDEO);
          if (!videoElement) {
            console.debug(`[${PLATFORM_NAME}] Video element not found`);
            return null;
          }
          videoId = videoElement.dataset.e2eVid;
        } else {
          const activeVideo = document.querySelector(SELECTORS.ACTIVE_VIDEO);
          if (!activeVideo) {
            console.debug(`[${PLATFORM_NAME}] Active video element not found`);
            return null;
          }
          videoId = activeVideo.dataset.e2eVid;
        }

        if (!videoId) {
          console.debug(`[${PLATFORM_NAME}] Video ID not found`);
          return null;
        }

        curPageUrl = `https://www.douyin.com/video/${videoId}`;
        console.debug(`[${PLATFORM_NAME}] Video URL: ${curPageUrl}`);
      }

      return {
        platform: PLATFORM_NAME,
        url: curPageUrl,
      };
    } catch (error) {
      console.error(
        `[${PLATFORM_NAME}] Error extracting Douyin video page info:`,
        error,
      );
      return null;
    }
  }

  addButtonsToSliderList() {
    const sliderVideos = document.querySelectorAll(SELECTORS.SLIDER_VIDEO);
    let buttonsAdded = false;
    sliderVideos.forEach((sliderVideo) => {
      // Check if button already exists
      if (sliderVideo.querySelector(`button[${BUTTON_ATTRIBUTE}]`)) {
        buttonsAdded = true;
        return;
      }

      const userIconElement = sliderVideo.querySelector(SELECTORS.USER_ICON);
      if (userIconElement) {
        const div = document.createElement("div");
        div.style.position = "relative";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.marginTop = "20px";

        const button = this.createGrabClipButton(PLATFORM_INFO, PARAMS.NORMAL);
        button.setAttribute("class", userIconElement.firstElementChild.className);
        div.appendChild(button);
        
        // Add button at the first position
        userIconElement.parentElement.insertBefore(div, userIconElement);
        buttonsAdded = true;
        console.debug(`[${PLATFORM_NAME}] Added button to slider video`);
      } else {
        console.debug(`[${PLATFORM_NAME}] User icon element not found`);
      }
    });

    return buttonsAdded;
  }

  
  /**
   * 添加截取片段按钮
   * @returns {void}
   */
  addGrabClipButton() {
    try {
      console.debug(`[${PLATFORM_NAME}] addGrabClipButton`);

      // Try to add buttons to slider list first
      const buttonsAdded = this.addButtonsToSliderList();
      console.debug(
        `[${PLATFORM_NAME}] addButtonsToSliderList`,
        buttonsAdded,
      );

    } catch (error) {
      console.error("Error adding GrabClip button:", error);
    }
  }

  /**
   * 插入下载按钮
   */
  insertDownloadButton() {
    console.debug(`[${PLATFORM_NAME}] insertDownloadButton`);

    // 初始添加按钮
    this.addGrabClipButton();

    // 配置观察器，设置需要观察的选择器
    this.configureObserver({
      selectors: [
        SELECTORS.USER_ICON,
        SELECTORS.SLIDER_VIDEO,
        SELECTORS.ACTIVE_VIDEO,
      ],
    });

    // 初始化MutationObserver以监听异步加载的内容
    this.initMutationObserver();
  }
}

// 导出到全局作用域
const PLATFORM_INFO = {
  name: PLATFORM_NAME,
  displayName: "Douyin",
  domains: ["douyin.com"],
  needCookie: false,
  analyzer: DouyinAnalyzer,
};
window.PLATFORMS = {
  ...window.PLATFORMS,
  [PLATFORM_NAME]: PLATFORM_INFO,
};
