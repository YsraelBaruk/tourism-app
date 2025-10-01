import { width } from "@/app/index";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  destinationsSection: {
    backgroundColor: 'white',
    paddingHorizontal: width * 0.05,
    paddingVertical: 25,
    // flex: 1,
  },
  destinationCardGradient: {
    flex: 1,
    borderRadius: 12,  // igual ao seu card
    overflow: 'hidden', // para que o gradiente respeite os cantos arredondados
    position: 'relative'
  },
  destinationsHeader: {
    marginBottom: 20,
  },
  destinationsTitle: {
    color: '#4A90E2',
    fontSize: width * 0.05,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  searchContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 40,
    borderColor: '#2F5CDA',
    borderWidth: 1,
    width: width * 0.8,
  },
  searchInput: {
    flex: 1,
    fontSize: width * 0.03,
    color: '#333',

  },
  destinationsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  destinationCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  destinationImage: {
    width: '100%',
    height: width * 0.3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  destinationInfo: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  destinationName: {
    fontSize: width * 0.035,
    fontWeight: '500',
    color: '#fff',
    flex: 1,
  },
  destinationCity: {
    fontSize: width * 0.03,
    color: '#fff',
  },
  destinationCardCity: {
    flexDirection: 'row', 
    display: 'flex', 
    alignItems: 'flex-start', 
    justifyContent: 'flex-start', 
    gap: 10, 
    paddingLeft: 10, 
    paddingBottom: 10
  },
  favoriteIcon: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    right: 10
  },
  favoriteIconText: {
    fontSize: 18,
    color: '#ccc',
  },
  seeMoreButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 10,
  },
  seeMoreText: {
    color: 'white',
    fontSize: width * 0.035,
    fontWeight: '600',
  },
});

export default styles