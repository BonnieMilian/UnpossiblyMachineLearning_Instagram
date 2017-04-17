#!/bin/bash

api_key="API-KEY"
your_classifier="default"
image_1="https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/17439220_433739233638447_307425121868447744_n.jpg"
image_2="https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/17437551_281184838970297_5967223829288714240_n.jpg"
image_3="https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/e35/17437881_195380794288332_5361363141080907776_n.jpg"
ids="default"

threshold="0.0"

curl -X GET "https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=${api_key}&url=${image_1}&classifier_ids=${ids}&threshold=${threshold}&version=2016-05-20"