json.array!(@appointments) do |appointment|
  json.extract! appointment, 
  json.url appointment_url(appointment, format: :json)
end
