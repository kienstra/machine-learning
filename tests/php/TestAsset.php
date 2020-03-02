<?php
/**
 * Tests for class Asset.
 *
 * @package EasySurvey
 */

namespace EasySurvey;

use WP_Mock;

/**
 * Tests for class Asset.
 */
class TestAsset extends TestCase {

	/**
	 * Instance of Asset.
	 *
	 * @var Asset
	 */
	public $instance;

	/**
	 * Setup.
	 *
	 * @inheritdoc
	 * @return void
	 */
	public function setUp() : void {
		parent::setUp();
		WP_Mock::userFunction( 'plugins_url' );
		$plugin = new Plugin( dirname( dirname( __FILE__ ) ) );
		$plugin->init();
		$this->instance = new Asset( $plugin );
	}

	/**
	 * Test __construct.
	 *
	 * @covers \EasySurvey\Plugin::__construct()
	 */
	public function test_construct() {
		$this->assertEquals( __NAMESPACE__ . '\\Plugin', get_class( $this->instance->plugin ) );
	}

	/**
	 * Test init.
	 *
	 * @covers \EasySurvey\Plugin::init()
	 */
	public function test_init() {
		WP_Mock::expectActionAdded( 'enqueue_block_editor_assets', [ $this->instance, 'enqueue_block_editor_scripts' ] );
		$this->instance->init();
	}

	/**
	 * Test enqueue_block_editor_scripts.
	 *
	 * @covers \EasySurvey\Plugin::enqueue_block_editor_scripts()
	 */
	public function test_enqueue_block_editor_scripts() {
		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once()
			->withSomeOfArgs( 'easy-survey-block' );

		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once()
			->withSomeOfArgs( 'easy-survey-front-end' );

		$this->instance->enqueue_block_editor_scripts();

	}

	/**
	 * Test enqueue_script.
	 *
	 * @covers \EasySurvey\Plugin::enqueue_script()
	 */
	public function test_enqueue_script() {
		$slug = 'baz';
		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once()
			->withSomeOfArgs( "easy-survey-{$slug}" );

		$this->instance->enqueue_script( $slug );
	}
}
