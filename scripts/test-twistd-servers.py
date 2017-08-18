#!/usr/bin/env python

import datetime
import os

# request lib must be manually installed
# $ sudo pip install requests
import requests

# Asset URLs from every Twistd server
requestURLs = ['http://localhost:8080/01.mp4', 'http://localhost:8070/01.mp4', 'http://localhost:8060/01.mp4', 'http://localhost:8050/01.mp4'];

def logAndReboot(reason):
    print('Error! [' + reason + '] Twistd server failed. Restart computer.')

    # open log file in append mode
    f = open('test-twistd-servers-log.txt', 'a')

    # log time and the request that failed.
    f.write('\nERROR[ConnectionError] %s' % datetime.datetime.now())
    f.write('. Http request failed: %s' % requestURL)

    # close filestream
    f.close()

    # restart computer
    # os.system('sudo reboot')

    # exit python script
    quit()


# Request a test asset from each server.
for requestURL in requestURLs:
    print(requestURL)
    try:
        r = requests.head(requestURL, timeout=2.0)
        print('Connection result:')
        print(r.status_code)

        if r.status_code == 200:
            print('Server responded correctly. Carry on.')
        else:
          logAndReboot('Http-Status-'+r.status_code);

    except requests.ConnectionError:
        logAndReboot('ConnectionError');

    except requests.Timeout:
        logAndReboot('Timeout');