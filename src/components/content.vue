<style lang="less" scoped>
    @import "../assets/less/config";
    .content {
        overflow: auto;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 100;
        padding-bottom: 20px;
        -webkit-overflow-scrolling: touch;
        /*    touch-action: none;*/
    }

</style>
<template>
    <div class="content">
        <slot></slot>
    </div>
</template>
<script>


</script>
