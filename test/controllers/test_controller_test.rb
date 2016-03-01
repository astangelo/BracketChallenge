require 'test_helper'

class TestControllerTest < ActionController::TestCase
  test "should get testVar" do
    get :testVar
    assert_response :success
  end

end
