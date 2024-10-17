<script>
    export let info;
</script>

<div class="card image-full shadow-xl">
    <figure>
        <img src={info.imageUrl} alt={info.title} />
    </figure>
    <div class="card-body">
        <h2 class="card-title">{info.title}</h2>
        <p>{info.description}</p>
        <div class="card-actions justify-end">
            <a href="/watch/{info.id}" class="btn btn-primary">Watch</a>
        </div>
    </div>
</div>
