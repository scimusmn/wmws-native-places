#!/usr/bin/env python

import datetime
import os
import signal

# request lib must be manually installed
# $ sudo pip install requests
import requests

# Asset URLs from every Twistd server
requestURLs = ['http://localhost:8080/media/0001/01.mp4', 'http://localhost:8070/media/0001/01.mp4', 'http://localhost:8060/media/0001/01.mp4', 'http://localhost:8050/media/0001/01.mp4'];

# Search for a process by name, then send kill message.
def killProcessesByName(pstring):
    for line in os.popen('ps ax | grep ' + pstring + ' | grep -v grep'):
        fields = line.split()
        pid = fields[0]
        print('Killing [' + pstring + '] process:', pid)
        os.kill(int(pid), signal.SIGKILL)


def logAndReboot(reason):
    print('Error! [' + reason + '] Twistd server failed. Restart computer or processes.')

    # open log file in append mode
    f = open('test-twistd-servers-log.txt', 'a')

    # log time and the request that failed.
    f.write('\nERROR[ConnectionError] %s' % datetime.datetime.now())
    f.write('. Http request failed: %s' % requestURL)

    # close filestream
    f.close()

    # kill python (twistd) processes
    killProcessesByName('bin/twistd')

    # manually restart twistd startup script
    print ('run twisted-server-startup.sh...')
    os.system('/usr/local/bin/twisted-server-startup.sh')

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
          logAndReboot('Http-Status-'+str(r.status_code));

    except requests.ConnectionError:
        logAndReboot('ConnectionError');

    except requests.Timeout:
        logAndReboot('Timeout');
