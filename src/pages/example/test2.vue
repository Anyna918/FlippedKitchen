<template>
    <u-transition :show="show">
        <view class="transition"></view>
    </u-transition>
	
	<u-gap height="80" bgColor="#bbb"></u-gap>
</template>

<script>
    export default {
        data() {
            return {
                show: true
            }
        }
    }
</script>