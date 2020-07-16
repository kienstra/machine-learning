<?php
/**
 * Tests for class Asset.
 *
 * @package MachineLearning
 */

namespace MachineLearning;

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
	 * @covers \MachineLearning\Plugin::__construct()
	 */
	public function test_construct() {
		$this->assertEquals( __NAMESPACE__ . '\\Plugin', get_class( $this->instance->plugin ) );
	}

	/**
	 * Test init.
	 *
	 * @covers \MachineLearning\Plugin::init()
	 */
	public function test_init() {
		WP_Mock::expectActionAdded( 'enqueue_block_editor_assets', [ $this->instance, 'enqueue_block_editor_scripts' ] );
		$this->instance->init();
	}

	/**
	 * Test enqueue_block_editor_scripts.
	 *
	 * @covers \MachineLearning\Plugin::enqueue_block_editor_scripts()
	 */
	public function test_enqueue_block_editor_scripts() {
		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once()
			->withSomeOfArgs( 'machine-learning-block' );

		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once()
			->withSomeOfArgs( 'machine-learning-front-end' );

		$this->instance->enqueue_block_editor_scripts();

	}

	/**
	 * Test enqueue_script.
	 *
	 * @covers \MachineLearning\Plugin::enqueue_script()
	 */
	public function test_enqueue_script() {
		$slug = 'block';
		WP_Mock::userFunction( 'wp_enqueue_script' )
			->once()
			->withSomeOfArgs( "machine-learning-{$slug}" );

		$this->instance->enqueue_script( $slug );
	}

	/**
	 * Test enqueue_style.
	 *
	 * @covers \MachineLearning\Plugin::enqueue_style()
	 */
	public function test_enqueue_style() {
		$slug = 'example-style';
		WP_Mock::userFunction( 'wp_enqueue_style' )
			->once()
			->withSomeOfArgs( "machine-learning-{$slug}" );

		$this->instance->enqueue_style( $slug );
	}
}
