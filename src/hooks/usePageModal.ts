import { ref } from 'vue'
import type PageModal from '@/components/page-modal/page-modal.vue'

type CallbackFnType = (data?: any) => void

function usePageModal(newCallback?: CallbackFnType, editCallback?: CallbackFnType) {
  const modalRef = ref<InstanceType<typeof PageModal>>()
  // 新建
  function handleNewClick() {
    modalRef.value?.setModalVisible()
    if (newCallback) newCallback()
  }

  // 编辑
  function handelEditClick(itemData: any) {
    modalRef.value?.setModalVisible(false, itemData)
    if (editCallback) editCallback(itemData)
  }

  return { modalRef, handleNewClick, handelEditClick }
}

export default usePageModal
