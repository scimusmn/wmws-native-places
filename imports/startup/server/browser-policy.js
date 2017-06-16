import { BrowserPolicy } from 'meteor/browser-policy-common';

const hosts = Meteor.settings.public.mediaServer;

for (var i = 0; i < hosts.length; i++) {

  BrowserPolicy.content.allowOriginForAll(hosts[i]);

}
