json.array!(@quadrants) do |quadrant|
  json.extract! quadrant, :id, :bracket_id, :name, :order
  json.url quadrant_url(quadrant, format: :json)
end
