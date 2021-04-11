<template>
    <p>Index {{ $formatMessage({defaultMessage: "test message (id not injected)"}) }}</p>
</template>

<script lang="ts">
import {inject} from "vue";
import {Vue} from "vue-class-component";
import type {useIntl} from "vue-intl";

class Index extends Vue {
    public created() {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const intl: ReturnType<typeof useIntl> = inject("intl")!;

        console.log(intl.formatMessage({defaultMessage: "message in created (id injected)"}));
    }
}

export default Index;
</script>
