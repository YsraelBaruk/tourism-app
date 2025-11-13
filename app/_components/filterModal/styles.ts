import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: width > 400 ? 380 : width - 40,
    maxHeight: height * 0.85,
    paddingVertical: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A7EFB',
  },
  modalContent: {
    flex: 1,
    marginBottom: 20,
  },
  filterSection: {
    marginBottom: 25,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5A7EFB',
    marginBottom: 12,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#F8F9FF',
  },
  selectInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  selectIconContainer: {
    paddingLeft: 10,
  },
  selectArrow: {
    fontSize: 12,
    color: '#999',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dateInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#F8F9FF',
    color: '#333',
  },
  calendarButton: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FF',
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  typeButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#5A7EFB',
    backgroundColor: '#fff',
    minWidth: 80,
    alignItems: 'center',
  },
  typeButtonSelected: {
    backgroundColor: '#5A7EFB',
  },
  typeButtonText: {
    fontSize: 14,
    color: '#5A7EFB',
    fontWeight: '500',
  },
  typeButtonTextSelected: {
    color: '#fff',
  },
  accessibilityContainer: {
    gap: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#5A7EFB',
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: '#fff',
  },
  checkboxSelected: {
    backgroundColor: '#5A7EFB',
  },
  checkboxCheck: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 16,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    paddingTop: 10,
  },
  clearButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  applyButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#5A7EFB',
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default styles;