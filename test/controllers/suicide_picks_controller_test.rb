require 'test_helper'

class SuicidePicksControllerTest < ActionController::TestCase
  setup do
    @suicide_pick = suicide_picks(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:suicide_picks)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create suicide_pick" do
    assert_difference('SuicidePick.count') do
      post :create, suicide_pick: { round: @suicide_pick.round, team_instance_id: @suicide_pick.team_instance_id, user_entry_id: @suicide_pick.user_entry_id }
    end

    assert_redirected_to suicide_pick_path(assigns(:suicide_pick))
  end

  test "should show suicide_pick" do
    get :show, id: @suicide_pick
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @suicide_pick
    assert_response :success
  end

  test "should update suicide_pick" do
    patch :update, id: @suicide_pick, suicide_pick: { round: @suicide_pick.round, team_instance_id: @suicide_pick.team_instance_id, user_entry_id: @suicide_pick.user_entry_id }
    assert_redirected_to suicide_pick_path(assigns(:suicide_pick))
  end

  test "should destroy suicide_pick" do
    assert_difference('SuicidePick.count', -1) do
      delete :destroy, id: @suicide_pick
    end

    assert_redirected_to suicide_picks_path
  end
end
