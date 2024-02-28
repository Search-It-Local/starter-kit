# Popout Component

This component creates an animated dismissable popout in the corner of the viewport. The exact styling is upto you. When it is dismissed, sessionStorage is used so it doesn't reappear during the current session.

## Usage

```html
{% call component("popout", { id: "unique-id-here" }) %}
<div class="my-popout">
	<h2 data-label>Special Offer!</h2>
	<p data-description>Get 50% off until the end of the week.</p>
</div>
{% endcall %}
```

## Accessibility

The markup of the popout is upto you. The `popout` component will attempt to setup the required ARIA attributes for you. You just need to specify which elements are the label and description, using the `data-label` and `data-description` attributes.
