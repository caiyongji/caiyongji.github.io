---
title: CAIYONGJI
description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Praesent elementum facilisis leo vel fringilla est ullamcorper eget. At imperdiet dui accumsan sit amet nulla facilities morbi tempus."
toc: false
---
1111

<div class="hx-mt-6 hx-mb-6">
{{< hextra/hero-headline >}}
  Build modern websites&nbsp;<br class="sm:hx-block hx-hidden" />with Markdown and Hugo
{{< /hextra/hero-headline >}}
</div>

{{% steps %}}

### Step 1

This is the first step.

### Step 2

This is the second step.

{{% /steps %}}

2222


{{% details title="Click me to reveal" closed="true" %}}

This will be hidden by default.

{{% /details %}}


{{< callout emoji="🌐" >}}
  Hugo can be used to create a wide variety of websites, including blogs, portfolios, documentation sites, and more.
{{< /callout >}}


{{< cards >}}
  {{< card link="../callout" title="Callout" icon="warning" >}}
  {{< card link="../callout" title="Card with tag" icon="tag" tag= "A custom tag" >}}
  {{< card link="/" title="No Icon" >}}
{{< /cards >}}

{{< cards >}}
  {{< card link="/" title="Image Card" image="https://source.unsplash.com/featured/800x600?landscape" subtitle="Unsplash Landscape" >}}
  {{< card link="/" title="Local Image" image="/images/card-image-unprocessed.jpg" subtitle="Raw image under static directory." >}}
  {{< card link="/" title="Local Image" image="images/space.jpg" subtitle="Image under assets directory, processed by Hugo." method="Resize" options="600x q80 webp" >}}
{{< /cards >}}