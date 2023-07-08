export function apiNewProperty(formData) {
  return ({
    method: 'post',
    url: '/api/properties',
    data: formData
  })
}

export function apiGetProperty(propertyId) {
  return fetch(`/api/properties/${propertyId}`)
}

export function apiEditProperty(property_id, formData) {
  return ({
    method: 'patch',
    url: `/api/properties/${property_id}`,
    data: formData
  })
}

export function apiDeleteImage(imageId) {
  return ({
    method: 'delete',
    url: `/api/properties/image/${imageId}`
  })
}

export function apiGetPropertyBookings(propertyId) {
  return ({
    method: 'get',
    url: `/api/properties/${propertyId}/bookings`
  })
}