<?php
/**
 * Plugin bootstrap file.
 *
 * @package EasySurvey
 */

namespace EasySurvey;

/*
Plugin Name: Easy Survey
Plugin URI: https://github.com/kienstra/easy-survey
Description: Create an easy survey, to get quick feedback.
Version: 0.1.0
Author: Ryan Kienstra
Author URI: https://ryankienstra.com
License: GPLv3
*/

require_once dirname( __FILE__ ) . '/vendor/autoload.php';

( new Plugin( __FILE__ ) )->init();
