# Backbone-ize Build.com Product Page

## Set-up
- [x] Create directory/file structure pattern
- [x] Be able to define product module that extends BB model and is loaded via RequireJS(?)

## Models

### Product
- [x] Has one or many Finish(es) models
- [x] One of these Finish(es) is always active|selected

#### Must Know if…
- [x] It has Availability by Location restrictions
- [x] Has Square Footage
- [x] If it has Price Options
- [ ] If it has been configured
- [x] If it is a low-lead (AB1953) product

##### Nice to haves
- [ ] Bundle
- [ ] Accessories

### Finish
- [x] Finish Model

#### Must know if…
- [x] It is active|selected
- [x] It is available (if there are location restrictions)
- [x] Has MAP Restrictions

## Views

### Purchase Box
- [ ] Purchase Box View
  - [ ] Generic Product
  - [ ] Product with Location Awareness (inc. zip code form)
  - [ ] Product with Square Footage

#### May have the following regions…
- [ ] Product Image
- [ ] Page Heading
- [ ] Finish Name
- [ ] Lead Time Text
- [ ] Inventory (stock) information
- [ ] Shipping Information
- [ ] Add to Cart button
- [ ] Configuration Button
- [ ] Finish Views
- [ ] Ratings & Reviews
- [ ] Quantity
- [ ] Price
- [ ] Savings

## States

### Page Level
- [ ] No Finish Selected (single family page)
- [ ] Finish Selected

### Finishes

#### Hover
- [ ] Updates the following:
- [ ] Price
- [ ] Finish Name
- [ ] Shipping
- [ ] Lead Time Text
- [ ] Inventory Levels
- [ ] Product Image

#### Click
- [ ] Updates everything under Hover &
- [ ] Page Heading
- [ ] Document Title
- [ ] BCI (Unique ID)