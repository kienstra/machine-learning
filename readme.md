# Machine Learning

A question block, using [TensorFlow](https://www.tensorflow.org/) to find an answer to a question based on text on your site.

**Contributors:** [ryankienstra](https://profiles.wordpress.org/ryankienstra)
**Tags:** [blocks](https://wordpress.org/plugins/tags/blocks), [machine-learning](https://wordpress.org/plugins/tags/survey)
**Requires at least:** 5.2
**Tested up to:** 5.4
**Stable tag:** 0.1.0
**License:** [GPLv3](http://www.gnu.org/licenses/gpl-3.0.html)
**Donate link:** http://jdrf.org/get-involved/ways-to-donate/
**Requires PHP:** 7.1

[![Build Status](https://travis-ci.org/kienstra/machine-learning.svg?branch=master)](https://travis-ci.org/kienstra/machine-learning) [![Built with Grunt](https://gruntjs.com/cdn/builtwith.svg)](http://gruntjs.com)

## Description ##

The Machine Learning Question block answers your questions, based on content on the site.

![answer-question-block](https://user-images.githubusercontent.com/4063887/87750352-d4705000-c7c0-11ea-90fe-e3b321d81656.gif)

Get an answer based on the current post, or posts in a category.

Uses the [TensorFlow](https://www.tensorflow.org/) [BERT model](https://blog.tensorflow.org/2020/03/exploring-helpful-uses-for-bert-in-your-browser-tensorflow-js.html), a pre-trained NLP model. This runs in the browser, analyzing text that you choose.

## Installation ##

1. Upload the machine-learning directory to your /wp-content/plugins directory.
1. In the "Plugins" menu, find "Machine Learning," and click "Activate."

## Changelog ##

### 0.1.0 ###
- Adds the block, answering questions based on the content of a site.
