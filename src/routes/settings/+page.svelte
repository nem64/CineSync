<script>
    import { v4 as uuidv4 } from "uuid";
    let userId = window.localStorage.getItem("userId");

    if (userId === null) {
        generateNewId();
    }

    function generateNewId() {
        userId = uuidv4()
        window.localStorage.setItem("userId", userId);
    }
</script>

<div class="grid lg:grid-cols-12 grid-cols-1 gap-8">
    <label class="input input-bordered flex items-center lg:col-span-10 col-span-1 gap-2">
        User ID
        <input type="text" class="grow whitespace-nowrap overflow-hidden text-ellipsis" value={userId} disabled />
    </label>

    <button class="btn btn-outline btn-accent lg:col-span-2 col-span-1" on:click={generateNewId}>Generate new UUID</button>
</div>
