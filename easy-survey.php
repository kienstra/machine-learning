<?php
/**
 * Plugin bootstrap file.
 *
 * @package MachineLearning
 */

namespace MachineLearning;

/*
Plugin Name: Machine Learning
Plugin URI: https://github.com/kienstra/machine-learning
Description: Get a block that answers your questions.
Version: 0.1.0
Author: Ryan Kienstra
Author URI: https://ryankienstra.com
License: GPLv3
*/

require_once dirname( __FILE__ ) . '/vendor/autoload.php';

( new Plugin( __FILE__ ) )->init();
