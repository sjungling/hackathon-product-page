# Backbone-ize Build.com Product Page

## Set-up
- [-] Create directory/file structure pattern
- [x] Be able to define product module that extends BB model and is loaded via RequireJS(?)

## Models

### Product
- [ ] Has one or many Finish(es) models
- [ ] One of these Finish(es) is always active|selected

#### Must Know if…
- [ ] It has Availability by Location restrictions
- [ ] Has Square Footage
- [ ] Has MAP Restrictions
- [ ] If it has Price Options
- [ ] If it has been configured
- [ ] If it is a low-lead (AB1953) product

### Finish
- [ ] Finish Model

#### Must know if…
- [ ] It is active|selected
- [ ] It is available (if there are location restrictions)

## Views

### Purchase Box
- [ ] Purchase Box View

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
- [ ] P