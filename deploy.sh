#!/bin/bash

source ~/.erraroo/aws

ember deploy -prod && ember deploy:activate --revision=`ember deploy:list -prod | grep '1)' | awk {'print $2'}` -prod
