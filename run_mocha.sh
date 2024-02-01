#!/bin/bash

TZ=Europe/Stockholm NODE_ENV=test ts-mocha --require ts-node/register test
