# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160212144818) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "brackets", force: :cascade do |t|
    t.integer  "challenge_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "challenges", force: :cascade do |t|
    t.integer  "year"
    t.boolean  "active"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "game_picks", force: :cascade do |t|
    t.integer  "user_entry_id"
    t.integer  "team_instance_id"
    t.integer  "round"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer  "home_team_id"
    t.integer  "away_team_id"
    t.integer  "home_team_score"
    t.integer  "away_team_score"
    t.datetime "start_time"
    t.string   "game_timer"
    t.string   "half"
    t.integer  "quadrant_id"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  create_table "quadrants", force: :cascade do |t|
    t.integer  "bracket_id"
    t.string   "name"
    t.integer  "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "random_picks", force: :cascade do |t|
    t.integer  "user_entry_id"
    t.integer  "team_instance_id"
    t.integer  "round"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "suicide_picks", force: :cascade do |t|
    t.integer  "user_entry_id"
    t.integer  "team_instance_id"
    t.integer  "round"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  create_table "team_instances", force: :cascade do |t|
    t.integer  "team_id"
    t.integer  "bracket_id"
    t.integer  "quadrant_id"
    t.string   "abbreviation"
    t.integer  "seed"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string   "name"
    t.string   "logo_url"
    t.string   "mascot"
    t.string   "location"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_entries", force: :cascade do |t|
    t.integer  "user_id"
    t.integer  "challenge_id"
    t.boolean  "active"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email_address"
    t.string   "username"
    t.string   "password"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

end
