Binary Data Transfer Benchmark for [Socket.IO](https://github.com/learnboost/socket.io), [websockt.io](https://github.com/LearnBoost/websocket.io), [WebSocket-Node](https://github.com/kazuyukitanimura/WebSocket-Node), and [ws](https://github.com/einaros/ws)
=====
This benchmark reports client -> server -> client binary data transfer latency on websocket and calculates the throughput.
The binary data is randomly generated, and the websocket protocol is version 13.

Dependencies Install
====================
    $ npm install

Quick Start on localhost
===========
    $ npm install

    # WebSocket-Node benchmark
    $ node websocket-node-app.js&
    $ node client.js 1048576 5
    $ killall node

    # websocket.io benchmark
    $ node websocket.io-app.js&
    $ node client.js 1048576 5
    $ killall node

    # Socket.IO did not work under the author's environment
    $ node socket.io-app.js&
    $ node client.js 1048576 5
    $ killall node

    # ws benchmark
    $ node ws-app.js&
    $ node ws-client.js 1048576 5
    $ killall node
    # the best benchmark result under the author's environment
    # over 2Gbps!!!

Arguments
=========
### xxx-app.js [https=false]
* If the first argument is given, xxx-app.js starts listening to https (and wss). If this option is on, xxx-app.js requires server.cert and server.key files.

### xxx-client.js dataSize, numberOfMeasurement, [https=false]
* The first argument is dataSize (Bytes) in decimal to send.
* The second argument decides the number of Measurements for averaging (denominator of average).
* If the third argument is given, client.js uses https (and wss).

Tips
----
In order to quickly calculate the dataSize, \`echo "2^20"|bc\` tricks can be useful. For example, benchmarking 1MiB (= 2^20) data transferring performance, use

     $ node client.js `echo "2^20"|bc` 5

In order to run on a remote server, edit client.js and change the serverName.
