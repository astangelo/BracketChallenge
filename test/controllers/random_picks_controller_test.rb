require 'test_helper'

class RandomPicksControllerTest < ActionController::TestCase
  setup do
    @random_pick = random_picks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:random_picks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create random_pick" do
    assert_difference('RandomPick.count') do
      post :create, random_pick: { round: @random_pick.round, team_instance_id: @random_pick.team_instance_id, user_entry_id: @random_pick.user_entry_id }
    end

    assert_redirected_to random_pick_path(assigns(:random_pick))
  end

  test "should show random_pick" do
    get :show, id: @random_pick
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @random_pick
    assert_response :success
  end

  test "should update random_pick" do
    patch :update, id: @random_pick, random_pick: { round: @random_pick.round, team_instance_id: @random_pick.team_instance_id, user_entry_id: @random_pick.user_entry_id }
    assert_redirected_to random_pick_path(assigns(:random_pick))
  end

  test "should destroy random_pick" do
    assert_difference('RandomPick.count', -1) do
      delete :destroy, id: @random_pick
    end

    assert_redirected_to random_picks_path
  end
end
