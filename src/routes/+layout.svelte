<script>
  import "../app.css";
</script>

<div class="navbar bg-base-300">
  <div class="flex-1">
    <a href="/ " class="btn btn-ghost text-xl">CineSync</a>
    
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal px-1">
      <li><a href="/settings">Settings</a></li>
    </ul>
  </div>
</div>

<div class="container mx-auto p-8">
  <slot>

  </slot>
</div>

