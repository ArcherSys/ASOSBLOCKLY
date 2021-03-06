   /** @namespace
     * Activity Manager for ArcherSys OS
     * @author Weldon Henson
     */
    var ActivityManager = {};
    ActivityManager.NOTIDEX = [];
    /** Notification Aggregator for the Activity Manager
     * Only use this in plugins.
     * Creates Notifications for the NOTIDEX
     * refer to this by {@link ActivityManager.pushNotification}
     * @param {string} title - The Title of the Notification
     * @param {string} body - The Body of the Notification
     * @param {Function} onclick - what it does when you click it
     *
     */
    ActivityManager.pushNotification = function(title, body, onclick) {
        ActivityManager.NOTIDEX.push(new Notification(title, {
            icon: "/core/media/img/notidar.ico",
            body: body,
            onclick: onclick
        }));
    };
    /**
     * @constructor
     * Activity Base Class for an ArcherSys Activity
     * Users are given a 5 second warning
     * before the Activity is started by redirecting
     * the user to the Activity URL.
     *
     * @param {string} title - the title used in the notification for this activity
     * @param {string} url - the url that opens  the activity application in the same window as the starter app
     * @example
     * return new ActivityManager.ActivityStem(title,url);
     * @returns {Object} a new ActivityStem for the Activity Plugin
     *
     */
    ActivityManager.ActivityStem = function(title, url) {

        this.title = title;
        this.url = url;
          var self = this;
        this.start = function() {
            window.Notification.requestPermission(function(status) {
                ActivityManager.pushNotification(self.title, "The Activity " + self.title + " will be starting shortly.");
                window.setTimeout(function() {
                    window.location.assign(self.url);
                }, 5000);
            });
        };
    };
    /** @constructor
     * Actual Implementation of The Activity Stem
     *
     */
    ActivityManager.Activity = function(title, url) {
        return new ActivityManager.ActivityStem(title, url);
    };
    ActivityManager.SilverDriveActivity = function() {
        return new ActivityManager.Activity("SilverDrive", "https://silverdrive-acosf.c9.io");
         
    };
    ActivityManager.LogoutActivity = function() {
        return new ActivityManager.Activity("Logout of ASOS", "http://localhost/logout.php");
    };
    ActivityManager.YiiTubeActivity = function(channel) {
        return new ActivityManager.Activity("My YiiTube TV", "http://localhost/entetainment/yiitube?channel=" + channel);
    };
    ActivityManager.ChemistryChannelActivity = function() {
        return new ActivityManager.YiiTubeActivity("chemistry");
    };
    ActivityManager.BrowserAuthActivity = function(url) {
        return new Activity("Browser Login", url);
    };
    /**  @constructor Creates an ArcherSysOS-Standard
    * True Thread to use to do complicated activities
    * that require functions.
    * @param {String} title - Labels The Thread
    * @param {String} scriptURL - JavaScript File To Run as a Thread.
    */
  ActivityManager.BackgroundActivity = function(scriptURL,title){
         this.workers = [window.Worker(scriptURL),window.Worker("localhost/core/require.js")];
         
         this.backgroundJobTitle = title;
         var self = this;
         
  };
  ActivityManager.NeokitLoaderActivity =function(title){
      return new ActivityManager.BackgroundActivity("http://localhost/core/js/neokit-loader.js",title);
  };
  /** constructor
   * Creates an Activity that uses Mozilla Persona
   * @param {String} title - The name of the Activity That will come up in the alert
  */
  ActivityManager.PersonaLoginActivity = function(title){
      this.start = function() {
          ActivityManager.pushNotification(title, "The Activity " + title + "Will Start Shortly");
          window.navigator.id.get();
      };
  };
  /** @constructor
  * Creates a very special activity that does
  * something the other type would not do
  * it does anything you specify in the callback
  * @param {String} title - the Title of the Activity and Notification
  * @param {String} body - the Content inside the notification
  * @param {Function} callback - what the notification does when clicked
  */
 
 ActivityManager.NotificationActivity = function(title,body,callback){
     this.start = function(){
         ActivityManager.pushNotification(title,body,callback);
     };
 };
 /** @constructor
  * Creates a ServiceNoticeActivity in which
  * uses the Notification Activity to
  * help hold the callback for
  * which is always ran as a service
  * and that service is never accepted as empty
  * @param {string} title - Title of Service
  * @param {Function} serviceHandler - callback which starts the service.
  */
  ActivityManager.ServiceNoticeActivity = function(title,serviceHandler){
      return new ActivityManager.NotificationActivity(title,"The Service "+title+" will start when you click this notification",serviceHandler);
  };
  ActivityManager.BIRDRunnerActivity = function(hubBase,roomName,maxPeers,siteName,youtube){
      var TogetherJSConfig_findRoom = {
          prefix: roomName,
          max: maxPeers
      };
      var TogetherJSConfig_toolName = "BIRDKit";
      var TogetherJSConfig_youtube = youtube || true;
      var TogetherJSConfig_inviteFromRoom = true;
      return new ActivityManager.ServiceNoticeActivity("BIRD",function(){
          TogetherJS(this);
          return false;
      });
      
  };
  